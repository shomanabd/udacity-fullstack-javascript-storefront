import {
  SpecReporter,
  DisplayProcessor,
  StacktraceOption,
} from "jasmine-spec-reporter";

class CustomProcessor extends DisplayProcessor {
  displayJasmineStarted(info: jasmine.SuiteInfo, log: string): string {
    return `🚀 Jasmine Test Suite Started: ${log}`;
  }
}

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.PRETTY,
      displaySuccessful: true,
      displayFailed: true,
      displayPending: true,
    },
    customProcessors: [CustomProcessor],
  }) as any
);
