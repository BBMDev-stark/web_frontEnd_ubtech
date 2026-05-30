'use client';
// src/components/payment/VietQRPaymentPanel.tsx
// Panel VietQR kích thước lớn + auto-polling 5 giây
import { useEffect, useRef, useState, useCallback } from 'react';
import { Copy, Check, Loader2, CheckCircle2, RefreshCw, Clock } from 'lucide-react';
import { checkPaymentStatus, type VietQRData } from '@/lib/paymentApi';

const ZALO_PHONE = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
const BANK_BIN   = process.env.NEXT_PUBLIC_BANK_BIN   || '970437';

interface Props {
  qrData       : VietQRData;
  onPaid?      : (paidAt: string) => void;
  pollInterval?: number;
}

export default function VietQRPaymentPanel({ qrData, onPaid, pollInterval = 5000 }: Props) {
  const [copied,    setCopied]    = useState<string | null>(null);
  const [status,    setStatus]    = useState<'waiting' | 'checking' | 'paid' | 'error'>('waiting');
  const [pollCount, setPollCount] = useState(0);
  const [elapsed,   setElapsed]   = useState(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clockRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const stoppedRef = useRef(false);
  const onPaidRef  = useRef(onPaid);   // stable ref cho onPaid callback
  useEffect(() => { onPaidRef.current = onPaid; }, [onPaid]);

  useEffect(() => {
    clockRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => { if (clockRef.current) clearInterval(clockRef.current); };
  }, []);

  const stopPolling = useCallback(() => {
    stoppedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (clockRef.current) clearInterval(clockRef.current);
  }, []);

  const poll = useCallback(async () => {
    if (stoppedRef.current) return;
    setStatus('checking');
    try {
      const result = await checkPaymentStatus(qrData.orderCode);
      setPollCount(c => c + 1);
      if (result.paymentStatus === 'paid') {
        setStatus('paid');
        stopPolling();
        onPaidRef.current?.(result.paidAt || new Date().toISOString());
        return;
      }
      setStatus('waiting');
    } catch {
      setStatus('error');
    }
    if (!stoppedRef.current) timerRef.current = setTimeout(poll, pollInterval);
  }, [qrData.orderCode, pollInterval, stopPolling]);

  useEffect(() => {
    timerRef.current = setTimeout(poll, 2000);
    return () => stopPolling();
  }, [poll, stopPolling]);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  const fmtElapsed = (s: number) => {
    const m = Math.floor(s / 60), sec = s % 60;
    return m > 0 ? `${m}:${String(sec).padStart(2, '0')}` : `${sec}s`;
  };

  // ── Đã thanh toán ─────────────────────────────────────────────────
  if (status === 'paid') return (
    <div className="w-full rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden shadow-xl">
      <div className="p-10 flex flex-col items-center gap-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <p className="text-2xl font-black text-green-700">Thanh toán thành công! 🎉</p>
        <p className="text-base text-green-600 max-w-sm">
          Hệ thống đã xác nhận chuyển khoản. Đơn hàng đang được xử lý.
        </p>
      </div>
    </div>
  );

  // ── Đang chờ ──────────────────────────────────────────────────────
  return (
    <div className="w-full rounded-3xl border-2 border-blue-100 bg-white shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0057FF] to-[#338BFF] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><rect x="3" y="3" width="8" height="8" rx="1" stroke="white" strokeWidth="2"/><rect x="13" y="3" width="8" height="8" rx="1" stroke="white" strokeWidth="2"/><rect x="3" y="13" width="8" height="8" rx="1" stroke="white" strokeWidth="2"/><rect x="14" y="14" width="2" height="2" fill="white"/><rect x="18" y="14" width="2" height="2" fill="white"/><rect x="14" y="18" width="6" height="2" fill="white"/></svg>
          </div>
          <p className="text-white font-bold text-lg">Thanh toán VietQR</p>
        </div>
        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-1.5">
          {status === 'checking'
            ? <><Loader2 className="w-3.5 h-3.5 text-white animate-spin" /><span className="text-white/90 text-sm font-medium">Đang kiểm tra...</span></>
            : <><Clock className="w-3.5 h-3.5 text-white/80" /><span className="text-white/90 text-sm font-medium">{fmtElapsed(elapsed)}</span></>}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── QR code (BIG) ────────────────────────────────────── */}
          <div className="flex-shrink-0 flex flex-col items-center w-full lg:w-auto">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-blue-50 relative inline-block">
              <img
                src={qrData.qrUrl}
                alt="VietQR"
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.src = `https://img.vietqr.io/image/${BANK_BIN}-${qrData.accountNumber}-compact2.jpg`
                    + `?amount=${qrData.amount}&addInfo=${encodeURIComponent(qrData.content)}&accountName=${encodeURIComponent(qrData.accountName)}`;
                }}
              />
              {/* Pulse dot */}
              {status === 'waiting' && (
                <span className="absolute top-2 right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0057FF] opacity-50" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0057FF]" />
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"/><path d="M12 7v5l3 3"/></svg>
              Quét bằng app ngân hàng
            </div>
          </div>

          {/* ── Thông tin TK ──────────────────────────────────────── */}
          <div className="flex-1 w-full space-y-4">

            {/* Bank + account */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard label="Ngân hàng" value={qrData.bankName} big />
              <InfoCard label="Chủ tài khoản" value={qrData.accountName} big />
              <div className="sm:col-span-2">
                <InfoCard
                  label="Số tài khoản"
                  value={qrData.accountNumber}
                  mono big
                  action={
                    <CopyButton text={qrData.accountNumber} id="acc" copied={copied} onCopy={copy} />
                  }
                />
              </div>
            </div>

            {/* Số tiền */}
            <div className="bg-blue-50 rounded-2xl px-5 py-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">Số tiền cần chuyển</span>
              <span className="text-2xl font-black text-[#0057FF]">
                {qrData.amount.toLocaleString('vi-VN')}₫
              </span>
            </div>

            {/* Nội dung CK — quan trọng nhất */}
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-amber-700">
                  Nội dung chuyển khoản <span className="text-red-500">*</span>
                </p>
                <CopyButton text={qrData.content} id="content" copied={copied} onCopy={copy} label="Sao chép" />
              </div>
              <p className="text-xl font-black text-gray-900 font-mono tracking-widest break-all">
                {qrData.content}
              </p>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <span>⚠</span>
                <span>Nhập ĐÚNG nội dung này để đơn hàng được xác nhận tự động</span>
              </p>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RefreshCw className={`w-4 h-4 ${status === 'checking' ? 'animate-spin text-blue-500' : ''}`} />
                <span>
                  Tự động kiểm tra mỗi {pollInterval / 1000}s
                  {pollCount > 0 && <span className="text-gray-300 ml-1.5">({pollCount} lần)</span>}
                </span>
              </div>
              <a
                href={`https://zalo.me/${ZALO_PHONE}`}
                target="_blank" rel="noopener noreferrer"
                className="text-[#0057FF] text-sm font-semibold hover:underline flex items-center gap-1"
              >
                Hỗ trợ Zalo →
              </a>
            </div>

            {status === 'error' && (
              <p className="text-sm text-orange-500 flex items-center gap-1">
                <span>⚡</span> Lỗi kết nối, đang tự thử lại...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────
function InfoCard({ label, value, mono, big, action }: {
  label: string; value: string; mono?: boolean; big?: boolean; action?: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-xl px-4 py-3">
      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <span className={`font-bold text-gray-900 ${big ? 'text-base' : 'text-sm'} ${mono ? 'font-mono tracking-wide' : ''}`}>
          {value}
        </span>
        {action}
      </div>
    </div>
  );
}

function CopyButton({ text, id, copied, onCopy, label }: {
  text: string; id: string; copied: string | null;
  onCopy: (t: string, k: string) => void; label?: string;
}) {
  const done = copied === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
        done ? 'bg-green-100 text-green-600' : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
      }`}
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {label && <span>{done ? 'Đã copy!' : label}</span>}
    </button>
  );
}
