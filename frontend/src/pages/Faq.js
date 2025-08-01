import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import '../style/global.css';

const questions = [
  {
    question: "Qui sommes-nous ?",
    answer: "ZeyCake est une pâtisserie artisanale en ligne fondée par Zeïnab, passionnée par les douceurs faites maison. Chaque création est réalisée sur commande, avec raffinement, soin et émotion.",
  },

  {
    question: "Comment passer commande ?",
    answer: "Rendez-vous sur notre page “Nos gâteaux”, ajoutez vos produits au panier puis validez votre commande en quelques clics !",
  },
  {
    question: "Comment passer les commandes spéciales ?",
    answer: "Pour les demandes personnalisées (anniversaires, événements, allergies), veuillez nous laisser des instructions dans la partie commentaires avant de valider votre commande",
  },
  {
    question: "Combien de temps à l’avance faut-il commander ?",
    answer: "Nous recommandons de commander au moins 48h à l’avance pour les gâteaux standards. Pour les commandes spéciales : 4 à 5 jours minimum.",
  },
  {
    question: "Faites-vous des produits sans lactose ?",
    answer: "Oui, certains de nos produits peuvent être adaptés sans lactose sur demande. Veuillez nous prévenir à l’avance.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Vous payez d'abord un accompte de 40% du prix initial, ensuite vous pourrez payer le reste lors du ramassage",
  },
  {
    question: "Où nous joindre ?",
    answer: "Par email : zeyycake@gmail.com — ou sur Instagram : zeycaake",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Foire aux questions" />

      <div className="faq-container">
        <h2 className="faq-title">Questions fréquentes</h2>

        {questions.map((item, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggle(index)}>
              {item.question}
              <span className="faq-arrow">{openIndex === index ? ' ➖' : '➕'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;
