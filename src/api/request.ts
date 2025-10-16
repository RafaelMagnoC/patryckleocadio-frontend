const API_URL = import.meta.env.VITE_API_URL_HTTPS;

type SimpleRequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

export async function request<TResponse = unknown>(
  endpoint: string,
  options: SimpleRequestOptions = {}
): Promise<TResponse> {

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const body =
    options.body && typeof options.body === "object"
      ? JSON.stringify(options.body)
      : (options.body as BodyInit | null);

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
    body,
  });

  // Trata erros
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));

    let message = 'Erro na requisição';

    // Se for array de erros do FluentValidation
    if (Array.isArray(errorBody)) {
      message = errorBody.map((e: any) => `${e.errorMessage}`).join('\n');
    } else if (errorBody.message) {
      message = errorBody.message;
    }

    throw new Error(message);
  }

  // Se o status for 204 ou não tiver conteúdo, retorna undefined
  if (response.status === 204) return undefined as unknown as TResponse;

  // Checa se o conteúdo não é vazio antes de chamar json
  const text = await response.text();
  if (!text) return undefined as unknown as TResponse;

  return JSON.parse(text) as TResponse;
}
