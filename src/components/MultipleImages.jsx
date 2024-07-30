import React, { useState, useCallback } from "react";
import { PhotoProvider, PhotoView, PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function MultipleImages() {
  const [currentImage, setCurrentImage] = useState(0);

    const photos = [
      {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
      },
      {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
      },
      {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
      },
      {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
      }
    ];
  


  return (
    <div>
      <PhotoProvider
          photoClosable={false}
          onIndexChange={(index)=>setCurrentImage(index)}
          overlayRender={({ index }) => {
            return(
              <div style={{position: 'absolute', bottom: '10px',left: '10px', gap: '4px', display: 'flex', color:'white'}}>
                {photos.map((photo)=>{
                  return(
                    <img width={"50px"} height={"50px"} src={photo.src} style={{border: photo.src === photos[currentImage]?.src? "2px solid skyblue": "2px solid transparent", borderRadius: "8px"}} ></img>
                  )
                })}
              </div>
            )
          }}
          overlayVisible={true}
        >
        
          <div className="foo">
            {photos.map((item, index) => (
              <PhotoView key={index} src={item.src} >
                  <img src={item.src} width={"300px"} height={"300px"} alt="" />
              </PhotoView>
            ))}
          </div>

      </PhotoProvider>
      {/* {photos.map((item, index)=>{
        return(
          <img src={item.src} width={"300px"} onClick={(event)=>openLightbox(event,{index})} height={"300px"} alt="" />
        )
      })}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> */}
    </div>
  )
}

