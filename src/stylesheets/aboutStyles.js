import {StyleSheet} from 'react-native';

export default aboutStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  mascotImage: {
    width: 100,
    height: 110,
    marginTop: 15
  },
  textSection: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  featuresSection: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20
  },
  featureText: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5
  },
  disclaimerSection: {
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disclaimerText: {
    textAlign: 'center',
    color: '#FF0000'
  },
  githubLink: {
    textAlign: 'center',
    color: '#0000FF'
  },
  bullet: {
    paddingTop: 9
  }
});
