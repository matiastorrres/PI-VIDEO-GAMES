import video from "../../img/loading.mp4";
import "./Loading.css";
function Loading() {
  return (
    <div>
      <video autoPlay loop muted className="video">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Loading;
