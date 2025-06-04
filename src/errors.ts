export class BaseThrowable extends Error {
    public name = 'BaseThrowable';

    public constructor(message: string|null = null, stack: string|null = null) {
        super(message ?? 'Unknown Error');
        if (stack) this.stack = stack;
    }
}

export class BaseWarning extends BaseThrowable {
    public name = 'BaseWarning';
}

export class BaseError extends BaseThrowable {
    public name = 'BaseError';
}
