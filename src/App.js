import './App.css';
import axios from "axios";
import Tag from "./components/Tag";
import {useState} from "react";
import Preloader from "./components/preloader";

function App() {

    const [tags, setTags] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [tagUrl, setTagUrl] = useState('');

    const onChangeHandler = (e) => {
        setTagUrl(e.target.value)
    }

    const getTags = async () => {
        const imageUrl = 'https://devhappycanvas.s3.amazonaws.com/bckgrnd/-lchMDd.png';
        const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(tagUrl)}&language=ru`;

        if (tagUrl) {
            try {
                setIsLoad(true);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: "Basic YWNjXzkzZjY0NTlkMzkzOGVmZTowM2VkNzhkOGRjZTc3NzQ4NjBkY2MxYWFhNjFmMDNmZg=="
                    }
                });
                setTags(response.data.result.tags)
                setIsLoad(false);
            } catch (error) {
                alert("Неверный URL");
            }
        } else alert("Введите ссылку");
    }
    return (
        <div className="App">
            <div className="wrapper">
                <div className="input-block">
                    <form action="#" id="#tagForm" method="get" onSubmit={getTags}>
                        <input type="text" onChange={onChangeHandler}/>
                        <button type="submit">Tags</button>
                    </form>
                </div>

                {isLoad &&
                <Preloader/>}

                <div className="tags">
                    {tags.length !== 0 && tags.map(el => <div key={el.confidence}>
                        <Tag tag={el.tag.ru} confidence={el.confidence}/>
                        <hr/>
                    </div>)}
                </div>

            </div>
        </div>
    );
}

export default App;
