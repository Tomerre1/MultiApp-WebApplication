export function EmailPreview(props) {
    return (
        <div className="mail-preview flex space-between">
            <div class="sender">Ricky Eckhardt</div>
            <div class="title">Awesome Job</div>
            <div className="date">Today 4:49pm</div>
            <div class="mail-preview-btn-container">
                <button class="star-btn star-on">
                    <i class="far fa-star" aria-hidden="true"></i>
                </button>
                <button class="remove-btn">
                    <i class="far fa-trash-alt" aria-hidden="true"></i>
                </button><button class="read-btn">
                    <i class="fas fa-envelope-open" aria-hidden="true"></i>
                </button></div>
        </div>
    )
}

