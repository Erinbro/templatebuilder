import { Injectable } from "@angular/core"
import { parse } from "papaparse"
import { Store } from '@ngrx/store';
import { ADD_TEMPLATE_DATA } from '../state/template/template.actions';

@Injectable(
  {
    providedIn: "root"
  }
)
/**
 * Converts csv to json
 * @param file CSV file
 */
export class CsvParser {

  constructor(private store: Store) { }

  parseCsv = (file: File) => {

    parse(file, {
      skipEmptyLines: false,
      complete: (results, _) => {
        console.log("complete() called")
        console.log(`data: `, results.data)
        const transformedData = this.emptyToEmptyString(results.data as string[][])
        console.log(`transformed: ${transformedData}`)
        const transformedDataToObject = this.arrayToObject(transformedData as string[][])
        this.store.dispatch(ADD_TEMPLATE_DATA({ data: transformedDataToObject }));
      }
    })

  }

  /**
   * Converts an empty string to a negative boolean
   * @param values
   */
  private emptyToEmptyString(values: string[][]) {

    const result: unknown[][] = []

    result.push(values[0])

    // NOTE We begin with i=1 because the the first array is the header
    for (let i = 1; i < values.length; i++) {
      const row = []

      // NOTE Inner array
      for (let j = 0; j < values[0].length; j++) {
        if (values[i][j] === "") {
          row.push("")
        }
        else {
          row.push(values[i][j])
        }
      }

      result.push(row);
    }

    return result;
  }

  private arrayToObject(data: string[][]): { columns: string[], data: any[] } {
    const columns = data[0]
    /**
     * We return this
     */
    const transformedData = { columns, data: [] }

    for (let i = 1; i < data.length; i++) {
      const obj: { [key: string]: string } = {}
      for (let j = 0; j < data[i].length; j++) {
        // @ts-ignore
        obj[columns[j]] = data[i][j]
      }
      // @ts-ignore
      transformedData.data.push(obj)
    }

    return transformedData
  }

}
