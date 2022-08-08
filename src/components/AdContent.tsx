import '../styles/containers/adContent.scss';

interface AdContentProps {
  firstImage: any;
  secondImage?: any;
  thirdImage?: any;
}
const AdContent = ({ firstImage, secondImage, thirdImage }: AdContentProps) => (
  <div className="ad-content">
    <img className="ad-content__images" src={firstImage} alt="first-add" />
    {secondImage && <img className="ad-content__images" src={secondImage} alt="first-add" />}
    {thirdImage && <img className="ad-content__images" src={thirdImage} alt="first-add" />}
  </div>
);

export default AdContent;
