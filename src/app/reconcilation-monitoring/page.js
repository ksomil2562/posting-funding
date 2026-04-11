"use client";

export default function ReconciliationPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">
          Reconciliation Monitoring
        </h1>
        <p className="text-gray-400">
          Batch Overview & Settlement Analysis
        </p>
      </div>

      {/* BATCH INFO */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <p className="text-gray-400 text-sm">Batch Cutoff Time</p>
        <h2 className="text-lg font-medium">
          Apr 9 2026 1:00AM ET → Apr 10 2026 1:00AM ET
        </h2>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Transactions</p>
          <h2 className="text-2xl font-semibold">5307</h2>
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Amount</p>
          <h2 className="text-2xl font-semibold">$1126176.88</h2>
        </div>

        <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20">
          <p className="text-red-400 text-sm">Not Posted</p>
          <h2 className="text-2xl font-semibold">38</h2>
        </div>

        <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
          <p className="text-yellow-400 text-sm">Discrepancy</p>
          <h2 className="text-2xl font-semibold">$8228.88</h2>
        </div>
      </div>

      {/* CSP DETAILS */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">CSP Details</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Total Transactions</p>
            <p>5018</p>
          </div>

          <div>
            <p className="text-gray-400">Total Amount</p>
            <p>$1063986.64</p>
          </div>

          <div>
            <p className="text-gray-400">Service Fee</p>
            <p>$8190.69</p>
          </div>

          <div>
            <p className="text-gray-400">ECP Return</p>
            <p>$3187.84</p>
          </div>
        </div>
      </div>

      {/* ECP RETURN */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">ECP Return Details</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Date</p>
            <p>04/11/2026</p>
          </div>

          <div>
            <p className="text-gray-400">Transactions</p>
            <p>47</p>
          </div>

          <div>
            <p className="text-gray-400">Return Amount</p>
            <p>$12455.80</p>
          </div>

          <div>
            <p className="text-gray-400">Fee</p>
            <p>$24.05</p>
          </div>
        </div>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Web</p>
            <p>$641025.98</p>
          </div>

          <div>
            <p className="text-gray-400">IVR</p>
            <p>$138320.44</p>
          </div>

          <div>
            <p className="text-gray-400">iOS</p>
            <p>$235881.51</p>
          </div>

          <div>
            <p className="text-gray-400">Android</p>
            <p>$56337.50</p>
          </div>

          <div>
            <p className="text-gray-400">AutoPay</p>
            <p>$46382.57</p>
          </div>
        </div>
      </div>

      {/* NOT RECEIVED */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Payment Status Not Received
        </h2>

        <div className="max-h-40 overflow-y-auto text-sm text-gray-300 space-y-1">
          <p>P-S01C1-20260409-10000005932609</p>
          <p>P-S01C1-20260409-10000005928857</p>
          <p>P-S01C1-20260409-10000005930102</p>
          <p>P-S01C1-20260409-10000005930088</p>
          <p>P-S01C1-20260409-10000005930265</p>
        </div>
      </div>

    </div>
  );
}