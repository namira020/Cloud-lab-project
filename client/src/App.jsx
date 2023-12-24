import axios from "axios";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  Select,
  Button,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";

const languages = ["javascript", "python", "c"];

const defaultCode = {
  javascript: `console.log("Javascript:");
function add(a, b) {
    return a+b;
}
const a = 1;
const b = 2;
const res = add(a, b);

console.log(res);`,
  python: `print("Python:")
def add(a, b):
  return a+b
a = 1
b = 2
res = add(a, b)
print(res)`,
  c: `#include <stdio.h>
int main() {
  printf("C:");
  int a = 1;
  int b = 2;
  int res = a + b;
  printf("%d", res);
}`,
};

function App() {
  const [code, setCode] = useState(defaultCode.javascript);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(languages[0]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
  };

  const handleCompile = async () => {
    try {
      const response = await axios.post("/execute", {
        code: code,
        language: language,
      });

      // Assuming the backend sends back an object with an 'output' property
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error during code compilation:", error);
      // Update your state or UI to show the error
      setOutput(error.response?.data?.error || "Error executing code");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 2 }}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Language" }}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value={languages[0]}>JavaScript</MenuItem>
          <MenuItem value={languages[1]}>Python</MenuItem>
          <MenuItem value={languages[2]}>C</MenuItem>
        </Select>

        <Editor
          height="60vh"
          defaultLanguage="javascript"
          language={language}
          value={code} // Change from defaultValue to value
          onChange={setCode}
          theme="vs-dark"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCompile}
          sx={{ mt: 2 }}
        >
          Compile
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Output:</Typography>
        <Box sx={{ border: "1px solid lightgray", p: 2, minHeight: "100px" }}>
          {output}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
