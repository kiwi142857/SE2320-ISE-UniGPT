import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../css/OneChat.css';

// 走马灯，输入图片的url数组
const BotCarousel = ({ photos }: { photos: string[] }) => {

  // 这里我是想用css的，但是试过了好多次都不行，所以就只能这样了
  let imageWidth = '45%';
  let centerGap = '10%';
  let sideGap = '0%';
  let borderRadius = '20px';
    
  return (
    <Carousel 
        showArrows={true}
        showStatus={false}
        showThumbs={false}
    >
      {photos?.length > 1 ? (
        photos.map((photo, index, array) => (
            <div 
                key={index} 
                style={{ display: 'flex'}}
            >
                <div style={{ 
                        width: sideGap, 
                        height: 'auto' 
                    }} />
                <img 
                    src={photo} 
                    alt='bot' 
                    style={{ 
                        width: imageWidth, 
                        height: 'auto', 
                        borderRadius: borderRadius
                    }} 
                />
                <div style={{ 
                        width: centerGap, 
                        height: 'auto' 
                    }} />
                <img 
                    src={array[(index + 1) % array.length]} 
                    alt='bot' 
                    style={{ 
                        width: imageWidth, 
                        height: 'auto',
                        borderRadius: borderRadius 
                    }} 
                />
                <div style={{ 
                        width: sideGap, 
                        height: 'auto' 
                    }} />
            </div>
        ))
      ) : (
        [<div 
            key={0} 
            style={{ display: 'flex'}}
        >
            <div style={{ 
                        width: sideGap, 
                        height: 'auto' 
                    }} />
            <img 
                src={photos[0]} 
                alt='bot' 
                style={{ 
                    width: imageWidth, 
                    height: 'auto' ,
                    borderRadius: borderRadius
                    }} 
            />
            <div style={{ 
                        width: centerGap, 
                        height: 'auto' 
                    }} />
            <img 
                src={photos[0]} 
                alt='bot' 
                style={{ 
                    width: imageWidth, 
                    height: 'auto' ,
                    borderRadius: borderRadius
                    }} 
            />
            <div style={{ 
                        width: sideGap, 
                        height: 'auto' 
                    }} />
        </div>]
      )}
    </Carousel>
  );
};

export default BotCarousel;