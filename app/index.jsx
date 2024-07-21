import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const index = () => {
  return (
    <ImageBackground source={require('../assets/SignIn.png')} style={styles.background} imageStyle={styles.imageStyle}>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/kenan-white 2.png')} style={styles.logo} />
          </View>
          <View style={styles.contentContainer}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/signup" asChild>
              <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Sign up</Text>
              </TouchableOpacity>
            </Link>
            <Text style={styles.termsText}>
              By clicking continue, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
   
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,  // Adjust width as needed
    height: 50,  // Adjust height as needed
    resizeMode: 'contain',
  },
  bottomContainer: {
    backgroundColor: '#189cb3', // Semi-transparent background
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  signupButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'black',
    fontSize: 16,
  },
  termsText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default index;
