export default function StampModal({ spot, onClose, onStamp }) {
  if (!spot) return null;

  const isLocked = spot.status === "locked";
  const isCompleted = spot.status === "completed";

  return (
    <div className="modal" onClick={(e) => e.target.classList.contains("modal") && onClose()}>
      <div className="modal-sheet">
        <div className="sheet-handle" />
        <h3>{spot.name}</h3>
        <p>{spot.description}</p>
        <div className="photo-slot">📷 사진을 올려서 인증해보세요</div>
        <div className="sheet-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            닫기
          </button>
          <button
            className="btn btn-primary"
            disabled={isLocked}
            onClick={() => !isLocked && !isCompleted && onStamp(spot.id)}
          >
            {isCompleted ? "이미 도장 완료" : "도장 찍기"}
          </button>
        </div>
      </div>
    </div>
  );
}
