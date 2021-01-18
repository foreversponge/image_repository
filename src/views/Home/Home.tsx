import ImagePicker from '../../components/image-picker';
import ImageBank from '../../components/image-bank';
import './Home.scss';

export default function Home() {
    return (
    <div>
        <div className="container"> 
            <p className="title"> Image Repository </p>
        </div>
        <ImagePicker/>
        <ImageBank/>
    </div>
    );
} 
