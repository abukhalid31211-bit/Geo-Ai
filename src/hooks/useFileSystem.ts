import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export function useFileSystem() {
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0];
    }
    return null;
  };

  const readFile = async (uri: string) => {
    return await FileSystem.readAsStringAsync(uri);
  };

  const writeFile = async (uri: string, content: string) => {
    await FileSystem.writeAsStringAsync(uri, content);
  };

  const deleteFile = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
  };

  const fileExists = async (uri: string) => {
    return await FileSystem.getInfoAsync(uri);
  };

  return { pickFile, readFile, writeFile, deleteFile, fileExists };
}
