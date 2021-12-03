const extensions = ['.js', '.ts', '.md']

export default (file='') => {
  return extensions.some(extension => file.includes(extension))
}