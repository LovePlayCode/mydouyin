import './BaseMusic.less';

const BaseMusic = () => {
  return (
    <>
      <div className="music-wrapper">
        <div className="mute-icon">
          <div className="wrap">
            {/* 播放图标 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="iconify iconify--flowbite"
            >
              <path
                fill="currentColor"
                d="M5.707 4.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414l-.004-.005C21.57 16.498 22 13.938 22 12a9.97 9.97 0 0 0-2.929-7.071a1 1 0 1 0-1.414 1.414A7.97 7.97 0 0 1 20 12c0 1.752-.403 3.636-1.712 4.873l-1.433-1.433C17.616 14.37 18 13.107 18 12c0-1.678-.69-3.197-1.8-4.285a1 1 0 1 0-1.4 1.428A4 4 0 0 1 16 12c0 .606-.195 1.335-.59 1.996L13 11.586V6.135c0-1.696-1.978-2.622-3.28-1.536L7.698 6.284l-1.99-1.991ZM4 8h.586L13 16.414v1.451c0 1.696-1.978 2.622-3.28 1.536L5.638 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2"
              />
            </svg>
            <span style={{ opacity: 0 }}>取消静音</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default BaseMusic;
