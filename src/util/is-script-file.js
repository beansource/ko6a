const extensions = ['.js', '.ts', '.md']

export default function isScriptFile(file='') {
  return extensions.some(extension => file.includes(extension))
}