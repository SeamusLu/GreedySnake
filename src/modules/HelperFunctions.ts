export function debouncer<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): T {
    let timeout: number | null = null;
    let called = false;

    const debounced = function (this: any, ...args: any[]) {
        if (!called) {
            func.apply(this, args);
            called = true;
        }

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            called = false;
        }, wait);
    };

    return debounced as T;
}

