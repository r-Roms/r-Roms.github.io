// factories/error_reporter.ts
var ValidationError = class extends Error {
};
var ErrorReporterFactory = class {
  create() {
    const reporter = {
      messages: [],
      hasErrors: false,
      report(message) {
        this.hasErrors = true;
        this.messages.push(message);
      },
      createError() {
        const error = new ValidationError("Validation failure");
        error.messages = this.messages;
        return error;
      }
    };
    return reporter;
  }
};

// factories/messages_provider.ts
var MessagesProviderFactory = class {
  create() {
    const provider = {
      getMessage(defaultMessage) {
        return defaultMessage;
      }
    };
    return provider;
  }
};

export {
  ErrorReporterFactory,
  MessagesProviderFactory
};
