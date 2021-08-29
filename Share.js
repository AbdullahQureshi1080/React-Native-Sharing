import {ImageEditor, ImageStore, Image} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

export default class SocialShare {
  baseData = '';
  async open(title, message, url, imageUrl, shareImageBase64) {
    try {
      var Base64Image;
      // If image is present
      if (imageUrl) {
        // If image is already in base64
        if (shareImageBase64) {
          Base64Image = imageUrl;
        }
        // Convert image to base64
        if (!shareImageBase64) {
          Base64Image = await this.Base64Image(imageUrl);
        }
      }
      var shareOptions = {
        // If title is not present then use default. Same goes for message below
        title: title || '',
        message:
          message && url && Base64Image
            ? `${message}${url}`
            : message
            ? `${message}`
            : 'Hi',
      };
      if (Base64Image) {
        shareOptions = Object.assign(shareOptions, {url: Base64Image});
      }
      if (!Base64Image && url) {
        shareOptions = Object.assign(shareOptions, {url: url});
      }
      let a = await Share.open(shareOptions);
      return true;
    } catch (e) {
      if (e.error === 'User did not share') {
        return false;
      }
      return false;
    }
  }

  async shareImageBase64(shareImageBase64) {}

  async shareSocial(
    title,
    message,
    url,
    imageUrl,
    shareImageBase64,
    socialType,
  ) {
    console.log(
      'The Complete data in share social',
      title,
      message,
      url,
      imageUrl,
      shareImageBase64,
      socialType,
    );
    let shareOptions = {};
    var Base64Image;
    // If image is present
    if (imageUrl) {
      // If image is already in base64
      if (shareImageBase64) {
        Base64Image = imageUrl;
      }
      // Convert image to base64
      if (!shareImageBase64) {
        Base64Image = await this.Base64Image(imageUrl);
        console.log('The Base64Image', Base64Image);
      }
    }
    if (socialType === 'facebook') {
      shareOptions = {
        title: title || '',
        message:
          message && url && Base64Image
            ? `${message}${url}`
            : message
            ? `${message}`
            : 'Hi',
        // For Stories
        // backgroundImage: '',
        // stickerImage: Base64Image, //or you can use "data:" link
        // backgroundBottomColor: '#fefefe',
        // backgroundTopColor: '#906df4',
        // attributionURL: 'http://deep-link-to-app', //in beta
        // appId: '219376304', //facebook appId
        social: Share.Social.FACEBOOK,
      };
    }
    if (socialType === 'twitter') {
      shareOptions = {
        title: title || '',
        message:
          message && url && Base64Image
            ? `${message}${url}`
            : message
            ? `${message}`
            : 'Hi',
        // For Stories
        // backgroundImage: imageUrl,
        // stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" link
        // backgroundBottomColor: '#fefefe',
        // backgroundTopColor: '#906df4',
        attributionURL: 'http://deep-link-to-app', //in beta
        social: Share.Social.TWITTER,
      };
    }
    if (socialType === 'instagram') {
      shareOptions = {
        title: title || '',
        message:
          message && url && Base64Image
            ? `${message}${url}`
            : message
            ? `${message}`
            : 'Hi',
        // For Stories
        // backgroundImage: imageUrl,
        // stickerImage: Base64Image, //or you can use "data:" link
        backgroundBottomColor: '#fefefe',
        backgroundTopColor: '#906df4',
        attributionURL: 'http://deep-link-to-app', //in beta
        social: Share.Social.INSTAGRAM,
        // forceDialog: true,
      };
    }
    if (Base64Image) {
      shareOptions = Object.assign(shareOptions, {
        url: Base64Image,
        // backgroundImage: Base64Image,
        // stickerImage: Base64Image,
      });
    }
    if (!Base64Image && url) {
      shareOptions = Object.assign(shareOptions, {
        url: url,
        // backgroundImage: url,
        // stickerImage: url,
      });
    }
    // try {
    const shareToSocial = await Share.shareSingle(shareOptions);
    console.log('Social Sharing to Platform' + ' ' + socialType, shareToSocial);
    // } catch (error) {
    //   console.log('The error', error);
    // }
  }

  async Base64Image(imageUrl) {
    let promise = new Promise(async (resolve, reject) => {
      await RNFetchBlob.fetch('GET', imageUrl, {})
        // when response status code is 200
        .then(async res => {
          let base64Str = res.base64();
          this.baseData = res.base64();
          // this.setState({baseData: base64Str});
          base64Str = 'data:image/png;base64,' + base64Str;
          return resolve(base64Str);
        })
        // Status code is not 200
        .catch((errorMessage, statusCode) => {
          console.log('The error Message', errorMessage);
          return resolve(null);
        });
    });
    return promise;
  }
  async Base64ImageConvert(imageUrl) {
    let promise = new Promise(async (resolve, reject) => {
      Image.getSize(
        imageUrl,
        (width, height) => {
          let imageSettings = {
            offset: {x: 0, y: 0},
            size: {width: width || 200, height: height || 200},
            resizeMode: 'contain',
          };
          ImageEditor.cropImage(
            imageUrl,
            imageSettings,
            imgUri => {
              ImageStore.getBase64ForTag(
                imgUri,
                base64Data => {
                  var url = base64Data;
                  return resolve(url);
                },
                reason => {
                  return resolve(null);
                },
              );
            },
            reason => {
              return resolve(null);
            },
          );
        },
        reason => {
          return resolve(null);
        },
      );
    });

    return promise;
  }
}
// module.exports = {SocialShare};
