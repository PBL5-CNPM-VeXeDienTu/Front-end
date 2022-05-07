const Modal = ({ clickedImg, setClickedImg }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains('dismiss')) {
            setClickedImg(null)
        }
    }

    return (
        <>
            <div className="overlay dismiss" onClick={handleClick}>
                <img src={clickedImg} alt="bigger pic" />
                <span className="dismiss" onClick={handleClick}></span>
            </div>
        </>
    )
}

export default Modal
