export const LandingScreen: React.FC = () => {

  return (
    <div className="header-bg" style={{backgroundImage: "url(LandingScreen.jpg)"}}>
    <div className="lp-container">
        <div className="lp-title-wrapper">
            <p className="lp-title">いきたいときに、<br></br>すぐ探せる</p>
        </div>
        <div className="lp-text-wrapper">
            <p className="lp-text">ベビーカーや車椅子で外出したとき、トイレがない。使いたいのに混んでいる。そんなとき、広いトイレを素早く探すことができるのが本アプリケーションです。</p>
            <p className="lp-text">スマホのホーム画面に追加してお使いください。(当アプリはスマートフォン専用となっています。)</p>
            <img className="qr" src="QR_895647.png" alt="QR"></img>
        </div> 
    </div>
    </div>
)
}