const empty = '░';

/**
 * A `Position` object is defined by the linear `position` in the source file as well as the
 * `line` and `character`.
 */
class Position {
  private line: number | undefined;
  private character: number | undefined;
  private position: number | undefined;

  /**
   * All of the parameters are optional. If certain information is not relevant you may provide
   * `undefined`.
   *
   * @param line The line in the source file.
   * @param character The character in the source file.
   * @param position The linear position along the source file.
   */
  constructor(line?: number, character?: number, position?: number) {
    this.line = line;
    this.character = character;
    this.position = position;
  }

  /**
   * Returns the string representation of a Position in the form of `[line:char|pos]`. If
   * any of its properties is undefined an empty block will appear. For instance, if we only
   * provide only the line then the result will be `[line:░|░]`.
   * @returns {string}
   */
  public toString(): string {
    const line = this.line === undefined ? empty : this.line;
    const char = this.character === undefined ? empty : this.character;
    const pos = this.position === undefined ? empty : this.position;
    return `[${line}:${char}|${pos}]`;
  }

  public str(): string {
    const line = this.line === undefined ? empty : this.line.toString();
    const char = this.character === undefined ? empty : this.character.toString();
    const pos = this.position === undefined ? empty : this.position.toString();
    return `${line.blue}:${char.yellow}|${pos.gray}`;
  }

  /**
   * A comparable Position to the calling object is a Position that has the same undefined
   * properties. For instance, `new Position(1)` and `new Position(10, 2)` are not comparable
   * since the second position defines its character location.
   *
   * Returns a copy of the Position parameter object with some properties set to undefined. Those
   * properties are set to undefined only in the case the calling object has them to set to
   * undefined. Thus, the returned object will be comparable to the calling object.
   *
   * @param pos The object we wish to compare.
   * @returns {Position} A comparable position.
   */
  public getComparablePosition(obj: Position): Position {
    const line = this.line === undefined ? undefined : obj.line;
    const char = this.character === undefined ? undefined : obj.character;
    const pos = this.position === undefined ? undefined : obj.position;
    return new Position(line, char, pos);
  }
}

export {
  Position,
};
