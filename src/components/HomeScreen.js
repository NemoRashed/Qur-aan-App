import { useEffect, useState } from "react";
import axios from "axios";

import RecitersScreen from "./RecitersScreen";
import ChapterScreen from "./ChapterScreen";
import PleyarScreen from "./PleyarScreen";

function HomeScreen() {
  const [reciters, serReciters] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [chapterDetail, setChapterDetail] = useState(null);
  const [reciterDetail, setReciterDetail] = useState(null);

  // Get All Reciters with Audio
  useEffect(() => {
    async function fetchData() {
      const {
        data: { reciters },
      } = await axios.get(`https://mp3quran.net/api/_english.php`);

      serReciters(reciters);
    }

    fetchData();
  }, []);

  // Get All Chapters
  useEffect(() => {
    async function fetchData() {
      const {
        data: { chapters },
      } = await axios.get(`https://api.quran.com/api/v4/chapters`);

      setChapters(chapters);
    }
    reciters && reciters.length > 0 && fetchData();
  }, [reciters]);

  const reciterHandler = (reciter) => {
    setReciterDetail(reciter);
  };
  const chapterHandler = (chapter) => {
    setChapterDetail(chapter);
  };
  return (
    <>
      <div className="text-center fs-4 title ">
        <h1>Qur'aan App</h1>
      </div>

      <div className="row p-5 home-body  ">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 space scroll">
          <RecitersScreen reciters={reciters} reciterHandler={reciterHandler} />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 space scroll ">
          <ChapterScreen chapters={chapters} chapterHandler={chapterHandler} />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12  space col-12 ">
          <PleyarScreen
            reciterDetail={reciterDetail}
            chapterDetail={chapterDetail}
          />
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
