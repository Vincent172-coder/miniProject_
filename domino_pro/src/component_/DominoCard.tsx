'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Import Button dari shadcn/ui

// Data default kartu domino (sesuai dengan gambar)
const defaultDominoes = [
  [6, 1], [4, 3], [5, 1], [3, 4], [1, 3], [1, 2]
];

const DominoCard = () => {
  const [dominoes, setDominoes] = useState(defaultDominoes);
  const [removeValue, setRemoveValue] = useState<number | ''>('');

  // Fungsi untuk menghitung jumlah kartu double
  const countDoubles = () => {
    return dominoes.filter(card => card[0] === card[1]).length;
  };

  // Fungsi untuk mengurutkan data Ascending
  const sortAscending = () => {
    const sorted = [...dominoes].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
    setDominoes(sorted);
  };

  // Fungsi untuk mengurutkan data Descending
  const sortDescending = () => {
    const sorted = [...dominoes].sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
    setDominoes(sorted);
  };

  // Fungsi untuk menghapus duplikat
  const removeDuplicates = () => {
    const unique = Array.from(new Set(dominoes.map(a => a.sort().join('-'))))
                             .map(e => e.split('-').map(Number));
    setDominoes(unique);
  };

  // Fungsi untuk membalikkan angka kartu
  const flipCards = () => {
    const flipped = dominoes.map(card => [card[1], card[0]]);
    setDominoes(flipped);
  };

  // Fungsi untuk menghapus kartu berdasarkan total angka tertentu
  const removeCardByTotal = () => {
    if (removeValue === '') return;
    const filtered = dominoes.filter(card => (card[0] + card[1]) !== removeValue);
    setDominoes(filtered);
  };

  // Fungsi untuk reset data
  const resetData = () => {
    setDominoes(defaultDominoes);
  };

  return (
    <div className="p-6 font-sans flex flex-col items-center">
      <h1 className="text-2xl font-bold">Dominoes</h1>

      <div className="w-full max-w-2xl text-center mt-4">
        <h2 className="text-lg">Source: {JSON.stringify(dominoes)}</h2>
        <p className="mt-2">Double Numbers: {countDoubles()}</p>

        {/* Bagian Tombol */}
        <div className="flex justify-center flex-nowrap gap-3 mt-4">
          <Button onClick={sortAscending}>Sort (ASC)</Button>
          <Button onClick={sortDescending}>Sort (DESC)</Button>
          <Button onClick={flipCards}>Flip</Button>
          <Button onClick={removeDuplicates}>Remove Dup</Button>
          <Button onClick={resetData} variant="destructive">Reset</Button>
        </div>

        {/* Input dan Remove */}
        <div className="flex gap-3 mt-4">
          <input
            type="number"
            placeholder="Input Number"
            value={removeValue}
            onChange={e => setRemoveValue(Number(e.target.value))}
            className="p-2 border rounded-md"
          />
          <Button onClick={removeCardByTotal}>Remove</Button>
        </div>

        {/* Kartu Domino */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Domino Cards:</h3>
          <div className="flex justify-center flex-nowrap mt-3 gap-2">
            {dominoes.map((card, index) => (
              <div key={index} className="flex flex-col items-center border rounded-md p-2 bg-gray-200 w-12 h-20 justify-center">
                <span className="text-lg font-bold">{card[0]}</span>
                <span className="border-t-2 w-full my-1"></span>
                <span className="text-lg font-bold">{card[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DominoCard;