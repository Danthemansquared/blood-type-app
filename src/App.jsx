import React, { useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { familyMembers } from "./familyMembers";



// 2) Red blood cell compatibility rules (ABO + Rh)

const bloodCompatibilityByType = {

  "O-": {

    canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],

    canReceiveFrom: ["O-"],

  },

  "O+": {

    canDonateTo: ["O+", "A+", "B+", "AB+"],

    canReceiveFrom: ["O-", "O+"],

  },

  "A-": {

    canDonateTo: ["A-", "A+", "AB-", "AB+"],

    canReceiveFrom: ["O-", "A-"],

  },

  "A+": {

    canDonateTo: ["A+", "AB+"],

    canReceiveFrom: ["O-", "O+", "A-", "A+"],

  },

  "B-": {

    canDonateTo: ["B-", "B+", "AB-", "AB+"],

    canReceiveFrom: ["O-", "B-"],

  },

  "B+": {

    canDonateTo: ["B+", "AB+"],

    canReceiveFrom: ["O-", "O+", "B-", "B+"],

  },

  "AB-": {

    canDonateTo: ["AB-", "AB+"],

    canReceiveFrom: ["O-", "A-", "B-", "AB-"],

  },

  "AB+": {

    canDonateTo: ["AB+"],

    canReceiveFrom: [

      "O-",

      "O+",

      "A-",

      "A+",

      "B-",

      "B+",

      "AB-",

      "AB+",

    ],

  },

};



function App() {

  const [selectedName, setSelectedName] = useState("");



  const selectedMember = useMemo(

    () => familyMembers.find((m) => m.name === selectedName),

    [selectedName]

  );



  const compatibility = useMemo(() => {

    if (!selectedMember) return null;



    const bt = selectedMember.bloodType;

    if (bt === "No sé" || !bloodCompatibilityByType[bt]) {

      return {

        canDonateTo: [],

        canReceiveFrom: [],

        unknown: true,

      };

    }



    const rules = bloodCompatibilityByType[bt];



    const canDonateTo = familyMembers.filter(

      (m) =>

        m.name !== selectedMember.name &&

        rules.canDonateTo.includes(m.bloodType)

    );



    const canReceiveFrom = familyMembers.filter(

      (m) =>

        m.name !== selectedMember.name &&

        rules.canReceiveFrom.includes(m.bloodType)

    );



    return { ...rules, canDonateTo, canReceiveFrom, unknown: false };

  }, [selectedMember]);



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-red-900 text-slate-50 flex items-center justify-center px-4">

      <div className="max-w-4xl w-full space-y-8">

        {/* Header */}

        <motion.header

          initial={{ opacity: 0, y: -16 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6, ease: "easeOut" }}

          className="text-center space-y-3"

        >

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">

            Compatibilidad de Sangre Familiar

          </h1>

          <p className="text-sm md:text-base text-slate-300/80 max-w-2xl mx-auto">

            Selecciona tu nombre para ver a qué familiares puedes donar sangre

            y de quiénes puedes recibir sangre.

          </p>

          <p className="text-xs text-slate-400">

            Solo educativo – no para decisiones médicas reales.

          </p>

        </motion.header>



        {/* Selector Card */}

        <motion.section

          initial={{ opacity: 0, y: 12 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.1, duration: 0.5 }}

          className="bg-slate-900/70 backdrop-blur-lg border border-slate-700/50 rounded-3xl shadow-xl shadow-red-900/40 p-5 md:p-6 space-y-4"

        >

          <h2 className="text-lg md:text-xl font-medium flex items-center justify-between">

            1. Elige tu nombre

            {selectedMember && (

              <span className="text-xs md:text-sm font-normal text-slate-300">

                Tipo de sangre:{" "}

                <span className="font-semibold">

                  {selectedMember.bloodType}

                </span>

              </span>

            )}

          </h2>



          {/* Select */}

          <div>

            <select

              value={selectedName}

              onChange={(e) => setSelectedName(e.target.value)}

              className="w-full rounded-2xl bg-slate-800/80 border border-slate-700/70 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500/80 focus:border-red-400 transition"

            >

              <option value="">Selecciona un familiar</option>

              {familyMembers.map((member) => (

                <option key={member.name} value={member.name}>

                  {member.name} ({member.bloodType})

                </option>

              ))}

            </select>

          </div>

        </motion.section>



        {/* Results */}

        <AnimatePresence>

          {selectedMember && compatibility && (

            <motion.section

              key={selectedMember.name}

              initial={{ opacity: 0, y: 16 }}

              animate={{ opacity: 1, y: 0 }}

              exit={{ opacity: 0, y: 16 }}

              transition={{ duration: 0.4 }}

              className="grid md:grid-cols-2 gap-4 md:gap-6"

            >

              {/* Donate to */}

              <motion.div

                initial={{ opacity: 0, x: -16 }}

                animate={{ opacity: 1, x: 0 }}

                exit={{ opacity: 0, x: -16 }}

                transition={{ delay: 0.05, duration: 0.4 }}

                className="bg-slate-900/70 backdrop-blur-lg border border-red-500/40 rounded-3xl p-5 md:p-6 shadow-lg shadow-red-900/40"

              >

                <h3 className="text-base md:text-lg font-medium mb-2">

                  ¿A quiénes puedo donar sangre?

                </h3>

                {compatibility.unknown ? (

                  <div className="space-y-2">

                    <p className="text-sm text-slate-300/90">

                      Aún no conocemos tu tipo de sangre (

                      <span className="font-semibold">No sé</span>). Una vez que lo

                      sepas, podremos calcular la compatibilidad de donación.

                    </p>

                    <p className="text-sm text-red-400/90 font-medium italic">

                      💉 Deberías de checar qué tipo eres

                    </p>

                  </div>

                ) : compatibility.canDonateTo.length === 0 ? (

                  <p className="text-sm text-slate-300/90">

                    No se encontraron familiares compatibles para donación.

                  </p>

                ) : (

                  <ul className="space-y-1 max-h-64 overflow-y-auto pr-1">

                    {compatibility.canDonateTo.map((m) => (

                      <motion.li

                        key={m.name}

                        initial={{ opacity: 0, x: -8 }}

                        animate={{ opacity: 1, x: 0 }}

                        transition={{ duration: 0.25 }}

                        className="flex items-center justify-between text-sm bg-slate-800/80 rounded-2xl px-3 py-2 hover:-translate-y-0.5 hover:bg-slate-800/100 transition"

                      >

                        <span className="truncate">{m.name}</span>

                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/20 border border-red-400/40">

                          {m.bloodType}

                        </span>

                      </motion.li>

                    ))}

                  </ul>

                )}

              </motion.div>



              {/* Receive from */}

              <motion.div

                initial={{ opacity: 0, x: 16 }}

                animate={{ opacity: 1, x: 0 }}

                exit={{ opacity: 0, x: 16 }}

                transition={{ delay: 0.1, duration: 0.4 }}

                className="bg-slate-900/70 backdrop-blur-lg border border-red-500/40 rounded-3xl p-5 md:p-6 shadow-lg shadow-red-900/40"

              >

                <h3 className="text-base md:text-lg font-medium mb-2">

                  ¿De quiénes puedo recibir sangre?

                </h3>

                {compatibility.unknown ? (

                  <div className="space-y-2">

                    <p className="text-sm text-slate-300/90">

                      Aún no conocemos tu tipo de sangre (

                      <span className="font-semibold">No sé</span>). Una vez que lo

                      sepas, podremos calcular de quiénes puedes recibir sangre.

                    </p>

                    <p className="text-sm text-red-400/90 font-medium italic">

                      💉 Deberías de checar qué tipo eres

                    </p>

                  </div>

                ) : compatibility.canReceiveFrom.length === 0 ? (

                  <p className="text-sm text-slate-300/90">

                    No se encontraron familiares compatibles como donantes.

                  </p>

                ) : (

                  <ul className="space-y-1 max-h-64 overflow-y-auto pr-1">

                    {compatibility.canReceiveFrom.map((m) => (

                      <motion.li

                        key={m.name}

                        initial={{ opacity: 0, x: 8 }}

                        animate={{ opacity: 1, x: 0 }}

                        transition={{ duration: 0.25 }}

                        className="flex items-center justify-between text-sm bg-slate-800/80 rounded-2xl px-3 py-2 hover:-translate-y-0.5 hover:bg-slate-800/100 transition"

                      >

                        <span className="truncate">{m.name}</span>

                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/20 border border-red-400/40">

                          {m.bloodType}

                        </span>

                      </motion.li>

                    ))}

                  </ul>

                )}

              </motion.div>

            </motion.section>

          )}

        </AnimatePresence>

      </div>

    </div>

  );

}



export default App;

