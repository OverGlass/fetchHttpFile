# fetchHttpFile
A function to fetch http file and return Uint8Array in Deno
```typescript
//main.ts
import fetchHttpFile from "https://raw.githubusercontent.com/OverGlass/fetchHttpFile/v0.0.1/fetchHttpFile.ts"
const Uint8ArrayFile = await fetchHttpFile("http://localhost:8080/testFile.pdf")
```

```sh
deno run --allow-net main.ts
```

For more information consult [fetchHttpFile.test.ts](https://github.com/OverGlass/fetchHttpFile/blob/master/fetchHttpFile.test.ts)
