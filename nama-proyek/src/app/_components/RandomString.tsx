"use client"; //buat berjalan di server

import { useEffect, useState } from "react";
import axios from "axios";

//menyimpan setiap huruf A-z didalama kurung sesuai APi
export default function RandomString() {
  const [letterCount, setLetterCount] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { // emngambil data APi , megelola, lalu menyimpan 
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain"
        );//tugasnya mengambil API 

        
        const strings = response.data.trim().split("\n").join(""); // kalau ini supaya string tergabung jadi satu 

    
        const count: Record<string, number> = {}; //kalau ada huruf yang muncul di simpan 
        for (let char of strings) { //loping 
          count[char] = (count[char] || 0) + 1;

          //count[A] = (count[char] || 0) + 1;
          //a=1
          //count[A] = (count[A] || A) + 1;

          //a=2
        }  //menyimpan jumlah huruf yang muncul

        setLetterCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }      //untuk proses loding

    fetchData(); //maengabil data dari api 
  }, []);

  //ini tampilan uinya 
  return (
    <div style={{
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      marginTop: "20px",
      fontSize: "18px",
    }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Hello Purwadhika Student
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.entries(letterCount)
            .sort()
            .map(([letter, count], index) => (
              <p
                key={letter}
                style={{
                  margin: "5px 0",
                  color: index % 2 === 1 ? "red" : "black", // Warna merah untuk baris genap
                }}
              >
                {letter}: {count}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}