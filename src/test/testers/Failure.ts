import { Position } from './Position';

interface Failure {
  ruleName: string;
  failure: string;
  startPosition: Position;
  endPosition: Position;
}

/**
 * An object representing a lint message from TSLint.
 */
class LintFailure implements Failure {
  fileName: string;
  ruleName: string;
  failure: string;
  startPosition: Position;
  endPosition: Position;

  /**
   * To create a lint failure we must provide the name of the file, the rule that was broken and
   * the message from the rule. The start end end positions are optional since we may not want to
   * check this information in some cases.
   *
   * @param fName The name of the file
   * @param ruleName The name of the rule
   * @param failure The message from the rule
   * @param [start] The start position of the failure
   * @param [end] The end position of the failure
   */
  constructor(fName: string, ruleName: string, failure: string, start?: Position, end?: Position) {
    this.fileName = fName;
    this.ruleName = ruleName || 'MISSING RULE NAME';
    this.failure = failure || 'MISSING FAILURE';
    this.startPosition = start || new Position();
    this.endPosition = end || new Position();
  }

  /**
   * Returns the string representation of the Failure object in the following form:
   *
   * ```
   * [fileName@{startPos -> endPos}] ruleName: failure
   * ```
   *
   * @returns {string}
   */
  public toString(): string {
    const pos = `${this.fileName}@{${this.startPosition} -> ${this.endPosition}}`;
    return `[${pos}] ${this.ruleName}: ${this.failure}`;
  }

  public str(): string {
    const pos = `${this.startPosition.str()} -> ${this.endPosition.str()}`;
    return `[${pos}] ${this.ruleName.gray} - ${this.failure}`;
  }

  /**
   * Return a clone of the Failure where the start and end positions are comparable to the
   * ones of the calling Failure.
   *
   * @param obj The Failure to compare.
   * @returns {Failure} A comparable Failure.
   */
  public getComparableFailure(obj: LintFailure): LintFailure {
    return new LintFailure(
      obj.fileName,
      obj.ruleName,
      obj.failure,
      this.startPosition.getComparablePosition(obj.startPosition),
      this.endPosition.getComparablePosition(obj.endPosition),
    );
  }
}

export {
  Failure,
  LintFailure,
};
