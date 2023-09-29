"use client";
const Error = () => {
    return (
        <div className="block py-5 px-6 mb-2 rounded bg-red-700 text-white font-bold cursor-pointer mt-4">
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
