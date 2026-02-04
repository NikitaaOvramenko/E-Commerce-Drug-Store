import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTelegram } from '../../context/TelegramContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register, error, isLoading, clearError } = useAuth();
  const { hapticFeedback, showAlert } = useTelegram();
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;
  const passwordValid = password.length >= 6;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!passwordsMatch) {
      hapticFeedback('impact');
      return;
    }

    if (!passwordValid) {
      hapticFeedback('impact');
      return;
    }

    try {
      await register(email, password);
      hapticFeedback('notification');
      await showAlert('Registration successful! Please check your email for verification.');
      navigate('/auth/login');
    } catch {
      hapticFeedback('impact');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-black">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1a2e1a] mb-6">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C20 4 17 7 17 11V18H31V11C31 7 28 4 24 4Z" fill="#ff6b9d"/>
              <path d="M17 18V37C17 41 20 44 24 44C28 44 31 41 31 37V18H17Z" fill="#ffb347"/>
              <circle cx="24" cy="11" r="3" fill="#fff" fillOpacity="0.6"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-gray-400">Sign up to get started</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            icon={<Mail size={20} />}
          />

          <div>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              icon={<Lock size={20} />}
              error={password !== '' && !passwordValid}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            {password !== '' && !passwordValid && (
              <p className="mt-2 text-xs text-red-400">Password must be at least 6 characters</p>
            )}
          </div>

          <div>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              icon={<Lock size={20} />}
              error={confirmPassword !== '' && !passwordsMatch}
            />
            {confirmPassword !== '' && !passwordsMatch && (
              <p className="mt-2 text-xs text-red-400">Passwords do not match</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group pt-2">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-md border-2 border-gray-600 bg-[#1a1a1a] peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors flex items-center justify-center">
                {agreed && <Check size={14} className="text-black" />}
              </div>
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              I agree to the{' '}
              <span className="text-green-500">Terms & Conditions</span> and{' '}
              <span className="text-green-500">Privacy Policy</span>
            </span>
          </label>

          <div className="pt-2">
            <Button
              type="submit"
              loading={isLoading}
              disabled={!agreed || !passwordsMatch || !passwordValid}
              fullWidth
              size="lg"
            >
              Create Account
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 pt-4">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-green-500 hover:text-green-400 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
