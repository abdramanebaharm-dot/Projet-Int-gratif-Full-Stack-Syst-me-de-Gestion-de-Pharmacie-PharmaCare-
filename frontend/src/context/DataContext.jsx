import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

const INITIAL_MEDICAMENTS = [
  { id: 1, nom: 'Paracétamol 500mg', categorie: 'Analgésique', prix: 1200, stock: 240, seuil: 50,  expire: '2025-12-01', fournisseur: 'MedPharma' },
  { id: 2, nom: 'Amoxicilline 500mg', categorie: 'Antibiotique', prix: 3500, stock: 85,  seuil: 30,  expire: '2026-03-15', fournisseur: 'BioSanté' },
  { id: 3, nom: 'Ibuprofène 400mg',   categorie: 'Anti-inflammatoire', prix: 1800, stock: 12,  seuil: 40,  expire: '2025-09-20', fournisseur: 'MedPharma' },
  { id: 4, nom: 'Métronidazole 250mg',categorie: 'Antibiotique', prix: 2200, stock: 60,  seuil: 25,  expire: '2026-06-10', fournisseur: 'PharmaPlus' },
  { id: 5, nom: 'Quinine 300mg',      categorie: 'Antipaludique', prix: 4500, stock: 130, seuil: 60,  expire: '2026-01-05', fournisseur: 'BioSanté' },
  { id: 6, nom: 'Vitamine C 1000mg',  categorie: 'Complément',    prix: 900,  stock: 310, seuil: 80,  expire: '2027-02-28', fournisseur: 'VitaLab' },
];

const INITIAL_VENTES = [
  { id: 1, date: '2025-06-01', medicament: 'Paracétamol 500mg', quantite: 20, total: 24000, client: 'Ali Hassan',    vendeur: 'Admin' },
  { id: 2, date: '2025-06-02', medicament: 'Quinine 300mg',     quantite: 10, total: 45000, client: 'Fatima Oumar',  vendeur: 'Admin' },
  { id: 3, date: '2025-06-03', medicament: 'Amoxicilline 500mg',quantite: 15, total: 52500, client: 'Ibrahim Malem', vendeur: 'Admin' },
  { id: 4, date: '2025-06-04', medicament: 'Ibuprofène 400mg',  quantite: 8,  total: 14400, client: 'Aisha Brahim',  vendeur: 'Admin' },
  { id: 5, date: '2025-06-05', medicament: 'Vitamine C 1000mg', quantite: 30, total: 27000, client: 'Moussa Deby',   vendeur: 'Admin' },
];

export function DataProvider({ children }) {
  const [medicaments, setMedicaments] = useState(INITIAL_MEDICAMENTS);
  const [ventes, setVentes]           = useState(INITIAL_VENTES);

  /* ---------- Medicaments ---------- */
  const addMedicament = (med) => {
    setMedicaments(prev => [...prev, { ...med, id: Date.now() }]);
  };

  const updateMedicament = (id, data) => {
    setMedicaments(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const deleteMedicament = (id) => {
    setMedicaments(prev => prev.filter(m => m.id !== id));
  };

  /* ---------- Ventes ---------- */
  const addVente = (vente) => {
    const med = medicaments.find(m => m.nom === vente.medicament);
    if (!med || med.stock < vente.quantite) return { success: false, message: 'Stock insuffisant.' };

    setVentes(prev => [...prev, { ...vente, id: Date.now(), total: med.prix * vente.quantite }]);
    updateMedicament(med.id, { stock: med.stock - vente.quantite });
    return { success: true };
  };

  /* ---------- Derived stats ---------- */
  const stats = {
    totalMedicaments: medicaments.length,
    stockCritique: medicaments.filter(m => m.stock <= m.seuil).length,
    totalVentesJour: ventes
      .filter(v => v.date === new Date().toISOString().slice(0, 10))
      .reduce((s, v) => s + v.total, 0),
    chiffreAffaires: ventes.reduce((s, v) => s + v.total, 0),
    ventesParJour: (() => {
      const map = {};
      ventes.forEach(v => { map[v.date] = (map[v.date] || 0) + v.total; });
      return Object.entries(map).map(([date, total]) => ({ date, total }));
    })(),
  };

  return (
    <DataContext.Provider value={{
      medicaments, addMedicament, updateMedicament, deleteMedicament,
      ventes, addVente,
      stats,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
