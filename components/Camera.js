import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Camera = ({ handleUpload }) => {

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status;
  };

  const pickFromCamera = async () => {
    const hasPermission = await requestCameraPermissions();
    if (hasPermission === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        const asset = result.assets && result.assets[0];
        if (asset && asset.uri) {
          const extension = asset.uri.split('.').pop();
          const name = `photo.${extension}`;

          handleUpload({
            uri: asset.uri,
            type: `image/${extension}`,
            name: name,
          });
        } else if (result.uri) {
          const extension = result.uri.split('.').pop();
          const name = `photo.${extension}`;

          handleUpload({
            uri: result.uri,
            type: `image/${extension}`,
            name: name,
          });
        } else {
          console.error('No URI found in the result:', result);
        }
      } else {
        console.log('Image picking was canceled');
      }
    } else {
      alert('Camera permission is required!');
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (hasPermission === 'granted') {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.cancelled) {
          const asset = result.assets && result.assets[0];
          if (asset && asset.uri) {
            const extension = asset.uri.split('.').pop();
            const name = `photo.${extension}`;

            handleUpload({
              uri: asset.uri,
              type: `image/${extension}`,
              name: name,
            });
          } else if (result.uri) {
            const extension = result.uri.split('.').pop();
            const name = `photo.${extension}`;

            handleUpload({
              uri: result.uri,
              type: `image/${extension}`,
              name: name,
            });
          } else {
            console.error('No URI found in the result:', result);
          }
        } else {
          console.log('Image picking was canceled');
        }
      } catch (error) {
        console.error('Error picking image:', error);
        alert('An error occurred while picking the image. Please try again.');
      }
    } else {
      alert('Media Library permission is required!');
    }
  };

  return (
    <View style={styles.options}>
      <TouchableOpacity style={styles.tab} onPress={pickFromGallery}>
        <Ionicons name='images-sharp' size={18} color='#fff' />
        <Text style={styles.tabTitle}>From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={pickFromCamera}>
        <Ionicons name='camera' size={18} color='#fff' />
        <Text style={styles.tabTitle}>From Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    marginBottom: 24,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  tab: {
    backgroundColor: '#71b79c',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default Camera;
