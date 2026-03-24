import * as assert from "assert";
import { collectLineRanges, formatLineRanges, selectionToLineRange } from "../../core/lineRanges";

suite("lineRanges", () => {
  test("selectionToLineRange returns current line for empty selection", () => {
    const result = selectionToLineRange({
      startLine: 7,
      startCharacter: 3,
      endLine: 7,
      endCharacter: 3,
      isEmpty: true
    });

    assert.deepStrictEqual(result, { start: 8, end: 8 });
  });

  test("selectionToLineRange excludes trailing line when selection ends at column zero", () => {
    const result = selectionToLineRange({
      startLine: 0,
      startCharacter: 0,
      endLine: 3,
      endCharacter: 0,
      isEmpty: false
    });

    assert.deepStrictEqual(result, { start: 1, end: 3 });
  });

  test("collectLineRanges sorts and merges overlapping or adjacent ranges", () => {
    const result = collectLineRanges([
      {
        startLine: 7,
        startCharacter: 0,
        endLine: 10,
        endCharacter: 4,
        isEmpty: false
      },
      {
        startLine: 0,
        startCharacter: 0,
        endLine: 2,
        endCharacter: 5,
        isEmpty: false
      },
      {
        startLine: 4,
        startCharacter: 1,
        endLine: 5,
        endCharacter: 0,
        isEmpty: false
      },
      {
        startLine: 2,
        startCharacter: 8,
        endLine: 5,
        endCharacter: 1,
        isEmpty: false
      }
    ]);

    assert.deepStrictEqual(result, [
      { start: 1, end: 6 },
      { start: 8, end: 11 }
    ]);
  });

  test("formatLineRanges matches sparse multi-selection output", () => {
    const result = formatLineRanges(
      collectLineRanges([
        {
          startLine: 0,
          startCharacter: 0,
          endLine: 2,
          endCharacter: 2,
          isEmpty: false
        },
        {
          startLine: 4,
          startCharacter: 0,
          endLine: 5,
          endCharacter: 3,
          isEmpty: false
        },
        {
          startLine: 7,
          startCharacter: 0,
          endLine: 10,
          endCharacter: 1,
          isEmpty: false
        }
      ])
    );

    assert.strictEqual(result, "1-3,5-6,8-11");
  });

  test("formatLineRanges renders discrete and continuous ranges", () => {
    const result = formatLineRanges([
      { start: 1, end: 3 },
      { start: 5, end: 6 },
      { start: 8, end: 11 }
    ]);

    assert.strictEqual(result, "1-3,5-6,8-11");
  });
});
