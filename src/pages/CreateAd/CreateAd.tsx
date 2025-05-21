import { useState } from "react";
import { db } from "../../firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mobilya");
  const [whatsapp, setWhatsapp] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addDoc(collection(db, "listings"), {
        title,
        desc,
        price,
        category,
        whatsapp,
        createdAt: Timestamp.now(),
      });

      alert("İlan başarıyla eklendi!");
      setTitle("");
      setDesc("");
      setPrice("");
      setWhatsapp("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 p-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold">Yeni İlan Ekle</h2>
      <input
        type="text"
        placeholder="Başlık"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Açıklama"
        className="w-full p-2 border rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Fiyat"
        className="w-full p-2 border rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Mobilya</option>
        <option>Elektronik</option>
        <option>Ev Aletleri</option>
        <option>Diğer</option>
      </select>
      <input
        type="text"
        placeholder="WhatsApp Numarası"
        className="w-full p-2 border rounded"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        className="w-full"
        onChange={(e) => {
          if (e.target.files) setImage(e.target.files[0]);
        }}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Yükleniyor..." : "İlanı Ekle"}
      </button>
    </form>
  );
};
