import { parse } from "papaparse"
/**
 * Converts csv to json
 * @param file CSV file
 */
export function CsvParser(file: File) {

  return parse(file, {
    skipEmptyLines: false,
    complete: (results, _) => {
      console.log("complete() called")
      console.log(`data: `, results.data)
      const transformedData = emptyToFalse(results.data as string[][])
      console.log(`transformed: ${transformedData}`)
    }
  })

}

/**
 * Converts an empty string to a negative boolean
 * @param values
 */
function emptyToFalse(values: string[][]) {

  const result: unknown[][] = []

  result.push(values[0])

  // NOTE We begin with i=1 because the the first array is the header
  for (let i = 1; i < values.length; i++) {
    const row = []

    // NOTE Inner array
    for (let j = 0; j < values[0].length; j++) {
      if (values[i][j] === "") {
        row.push(false)
      }
      else {
        row.push(values[i][j])
      }
    }

    result.push(row);
  }

  return result;
}
