import { API_CONFIG } from '@/config/api.config';
import { ApiError } from './errors';

function buildUrl(path: string, params: Record<string, string | number | boolean | undefined> = {}): string {
  const filteredParams: Record<string, string> = {};

  // Filtrar undefined e converter tipos para string
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      filteredParams[key] = String(value);
    }
  });

  const searchParams = new URLSearchParams({
    api_key: API_CONFIG.TMDB_API_KEY,
    ...filteredParams,
  });

  return `${API_CONFIG.TMDB_BASE_URL}${path}?${searchParams.toString()}`;
}

async function request<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  const url = buildUrl(path, params);
  
  try {
    const res = await fetch(url, { 
      next: { revalidate: API_CONFIG.CACHE_REVALIDATE } 
    });

    if (!res.ok) {
      throw new ApiError(
        `Falha ao buscar dados do TMDB: ${res.statusText}`,
        res.status,
        path
      );
    }

    return res.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Erro de rede ao acessar ${path}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      undefined,
      path
    );
  }
}

export async function get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  return request<T>(path, params);
}
