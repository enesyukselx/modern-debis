"use client";

const Error = () => {
    return (
        <div className="text-red-800 font-bold">
            Sunucuya bağlanılamıyor.
            <br />
            <button
                onClick={() => {
                    location.reload();
                }}
            >
                Tekrar denemek için tıklayınız.
            </button>
        </div>
    );
};

export default Error;
