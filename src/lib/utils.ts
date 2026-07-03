/**
 * Cria uma versão debounced de uma função que atrasa sua execução
 * até que um período de inatividade tenha passado.
 * 
 * @param callback - A função a ser executada após o delay
 * @param delayMs - O tempo em milissegundos para aguardar antes de executar
 * @returns Uma nova função debounced
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    // Cancela a execução anterior se ainda estiver pendente
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    // Agenda a nova execução
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}
