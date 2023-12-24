const fs = require('fs');
const path = require('path');
const util = require("util");
const { v4: uuidv4 } = require('uuid');
const exec = util.promisify(require('child_process').exec);

class Executor {
  constructor(language) {
    this.language = language;
  }

  async execute(code) {
    switch (this.language) {
      case 'javascript':
        return this.executeJavaScript(code);
      case 'python':
        return this.executePython(code);
      case 'c':
        return this.executeC(code);
      default:
        throw new Error('Unsupported language');
    }
  }

  async executeJavaScript(code) {
    const filename = uuidv4();
    const _path = path.join(__dirname, "tmp", filename);

    this.writefile(`${_path}.js`, code);
    const { stdout, stderr } = await exec(`node ${_path}.js`);
    this.removefile(`${_path}.js`);

    if (stderr) return 'Error executing JavaScript code: ' + stderr;
    else return stdout;
  }

  async executePython(code) {
    const filename = uuidv4();
    const _path = path.join(__dirname, "tmp", filename);

    this.writefile(`${_path}.py`, code);
    const { stdout, stderr } = await exec(`python ${_path}.py`);
    this.removefile(`${_path}.py`);

    if (stderr) return 'Error executing Python code: ' + stderr;
    else return stdout;

  }

  async executeC(code) {
    const filename = uuidv4();
    const _basePath = path.join(__dirname, "tmp", "c");
    const _path = path.join(_basePath, filename);

    this.writefile(`${_path}.c`, code);
    const { stdout, stderr } = await exec(`gcc ${_path}.c -o${_path} && ${_path}`);
    this.removeDir(_basePath);

    if (stderr) return 'Error executing C code: ' + stderr;
    else return stdout;
  }

  writefile(filename, data) {
    const dir = path.dirname(filename);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filename, data);
  }

  removefile(filename) {
    fs.unlinkSync(filename);
  }

  removeDir(folerpath) {
    fs.rmSync(folerpath, { recursive: true })
  }

}

module.exports = Executor;
