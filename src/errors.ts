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


// JSON Errors

export class JsonThrowable extends BaseThrowable {
    public name = 'JsonThrowable';
}

export class JsonError extends JsonThrowable {
    public name = 'JsonError';
}

export class JsonParseError extends JsonThrowable {
    public name = 'JsonParseError';
}
