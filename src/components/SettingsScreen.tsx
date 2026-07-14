/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Moon, 
  Globe, 
  Bell, 
  Clock, 
  Lock, 
  ShieldAlert, 
  User, 
  Mail, 
  Trash2, 
  Download, 
  Edit3, 
  CheckCircle,
  Calendar,
  AlertTriangle,
  Flame,
  Droplet
} from 'lucide-react';
import { PhaseInfo } from '../types';

interface SettingsScreenProps {
  onBack: () => void;
  phase: PhaseInfo;
  onLogout?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  phase,
  onLogout,
}) => {
  // App settings state
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('en');
  
  // Reminders state
  const [remindCycle, setRemindCycle] = useState<boolean>(true);
  const [remindContraception, setRemindContraception] = useState<boolean>(false);
  const [remindWater, setRemindWater] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('08:00');
  const [remindTemperature, setRemindTemperature] = useState<boolean>(true);

  // Privacy & Data states
  const [appLock, setAppLock] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'warning' | 'info'>('success');
  
  // Account Change form
  const [username, setUsername] = useState<string>('Lisa Meruthe Peru');
  const [userEmail, setUserEmail] = useState<string>('lisamerutheperu@gmail.com');
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);

  // Confirm delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleRequestData = () => {
    showToast('Secure data archive requested. A download link for your cycle history JSON will be sent to your email shortly.', 'success');
  };

  const handleSaveAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAccount(false);
    showToast('Account credentials updated successfully.', 'success');
  };

  const handleDeleteAccount = () => {
    showToast('Account scheduled for permanent deletion. All local and cloud metrics will be purged within 24 hours.', 'warning');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white border border-gray-100 rounded-3xl p-4 shadow-xl animate-fade-in flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            {toastType === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
            {toastType === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
            {toastType === 'info' && <Settings className="w-5 h-5 text-blue-500" />}
          </div>
          <div className="flex-grow">
            <h4 className="font-display font-bold text-xs text-gray-800 capitalize">{toastType} Update</h4>
            <p className="font-body text-[11px] text-gray-500 leading-normal mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Header section with Back Button */}
      <div className="p-6 pb-2 flex items-center gap-3.5">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-100 bg-white transition-all cursor-pointer active:scale-95 shadow-2xs flex items-center justify-center"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-display font-extrabold text-2xl text-gray-800 flex items-center gap-1.5">
            <span>Settings</span>
          </h2>
          <p className="font-body text-xs text-gray-400">Manage cycle preferences, notifications, and security</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* User Profile Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-full overflow-hidden border-2 shadow-sm shrink-0"
              style={{ borderColor: phase.primaryColor }}
            >
              <img 
                src={phase.avatarUrl} 
                alt="Settings user avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <span className="font-display font-black text-[9px] uppercase tracking-wider block mb-0.5" style={{ color: phase.primaryColor }}>
                Premium Account
              </span>
              <h3 className="font-display font-bold text-base text-gray-800 leading-tight">{username}</h3>
              <p className="font-body text-xs text-gray-400 mt-0.5">{userEmail}</p>
            </div>
            <button
              onClick={() => setIsEditingAccount(!isEditingAccount)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-100 transition-colors"
              title="Edit Profile Info"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Inline Editing for Account Info */}
          {isEditingAccount && (
            <form onSubmit={handleSaveAccountInfo} className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 space-y-3 animate-fade-in">
              <h4 className="font-display font-bold text-xs text-gray-700">Modify Account Details</h4>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-body text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-body text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingAccount(false)}
                  className="px-3 py-1.5 text-xs font-display font-semibold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-display font-bold text-white rounded-xl transition-all hover:brightness-105"
                  style={{ backgroundColor: phase.primaryColor }}
                >
                  Save Updates
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Section 2: App Preferences */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            App Preferences
          </h3>
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            
            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Moon className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Visual Theme</h4>
                  <p className="font-body text-[10px] text-gray-400">Simulate dark canvas colors</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setDarkMode(!darkMode);
                  showToast(darkMode ? 'Theme toggled to Soft Light Mode.' : 'Theme toggled to Elegant Dark Mode (Visual representation applied).', 'info');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${darkMode ? 'bg-amber-400' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${darkMode ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between py-1 border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Globe className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Language</h4>
                  <p className="font-body text-[10px] text-gray-400">Change translation context</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  showToast(`Language updated to ${e.target.value === 'en' ? 'English' : e.target.value === 'es' ? 'Spanish' : e.target.value === 'fr' ? 'French' : 'German'}.`, 'success');
                }}
                className="text-xs font-display font-semibold bg-gray-50 border border-gray-100 rounded-xl px-2.5 py-1.5 focus:outline-none"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Section 3: Reminders Configuration */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Intelligent Reminders
          </h3>
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            
            {/* Cycle Reminder */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Calendar className="w-4 h-4 text-violet-500" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Cycle Phase Notifications</h4>
                  <p className="font-body text-[10px] text-gray-400">Alert me when transitioning seasonal phases</p>
                </div>
              </div>
              <button 
                onClick={() => setRemindCycle(!remindCycle)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${remindCycle ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${remindCycle ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Contraception Reminder */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Flame className="w-4 h-4 text-red-400" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Contraception Reminder</h4>
                  <p className="font-body text-[10px] text-gray-400">Pill, patch, ring, or injection daily alert</p>
                </div>
              </div>
              <button 
                onClick={() => setRemindContraception(!remindContraception)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${remindContraception ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${remindContraception ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Drink Water Reminder */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Droplet className="w-4 h-4 text-blue-400" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Hydration Reminder</h4>
                  <p className="font-body text-[10px] text-gray-400">Periodic reminders to drink water</p>
                </div>
              </div>
              <button 
                onClick={() => setRemindWater(!remindWater)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${remindWater ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${remindWater ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Temperature Reminder */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Clock className="w-4 h-4 text-amber-500" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Basal Body Temperature</h4>
                  <p className="font-body text-[10px] text-gray-400">Log waking temperature in Luteal phases</p>
                </div>
              </div>
              <button 
                onClick={() => setRemindTemperature(!remindTemperature)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${remindTemperature ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${remindTemperature ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Default Reminder Time */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Default Alert Time</h4>
                  <p className="font-body text-[10px] text-gray-400">Time of day for alerts</p>
                </div>
              </div>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => {
                  setReminderTime(e.target.value);
                  showToast(`Default reminder schedule adjusted to ${e.target.value}.`, 'success');
                }}
                className="text-xs font-display font-bold bg-gray-50 border border-gray-100 rounded-xl px-2.5 py-1.5 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Section 4: Privacy & Data Security */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-gray-400">
            Privacy & Data Security
          </h3>
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            
            {/* App Lock Simulation */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Lock className="w-4 h-4 text-emerald-500" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Passcode & Biometrics</h4>
                  <p className="font-body text-[10px] text-gray-400">App Lock protection upon startup</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setAppLock(!appLock);
                  showToast(appLock ? 'App Lock deactivated.' : 'App Lock activated. Passcode requirement is now active.', 'info');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex items-center ${appLock ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all ${appLock ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Request Account Info / Download Data */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <Download className="w-4 h-4 text-indigo-500" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Request Account Info</h4>
                  <p className="font-body text-[10px] text-gray-400">Download complete cycle metrics record</p>
                </div>
              </div>
              <button
                onClick={handleRequestData}
                className="text-[11px] font-display font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Request
              </button>
            </div>

            {/* Change Account Credentials */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                  <User className="w-4 h-4 text-amber-500" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-800">Change Account Info</h4>
                  <p className="font-body text-[10px] text-gray-400">Modify email, username, and avatar</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingAccount(!isEditingAccount)}
                className="text-[11px] font-display font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Configure
              </button>
            </div>

            {/* Sign Out / Lock Session */}
            {onLogout && (
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-gray-50 text-gray-500">
                    <Lock className="w-4 h-4 text-teal-500" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs text-gray-800">Sign Out</h4>
                    <p className="font-body text-[10px] text-gray-400">Lock profile and return to welcome</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-[11px] font-display font-bold border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-700 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Delete Account (Destructive Action) */}
            <div className="flex items-center justify-between border-t border-red-50 pt-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-red-50 text-red-500">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-xs text-red-600">Delete Account</h4>
                  <p className="font-body text-[10px] text-red-400">Permanently erase account & data</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-[11px] font-display font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
              >
                Delete
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Delete Account Modal Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 border border-red-100 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-red-600">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <h4 className="font-display font-extrabold text-lg">Are you absolutely sure?</h4>
            </div>
            <p className="font-body text-xs text-gray-500 leading-relaxed">
              This action is <strong className="text-red-600">completely irreversible</strong>. Deleting your account will instantly remove all your calendar forecasts, symptoms logs, history metadata, and personalized seasonal profiles.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-display font-bold rounded-2xl transition-all cursor-pointer"
              >
                Cancel, Keep Data
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-display font-bold rounded-2xl transition-all cursor-pointer shadow-md shadow-red-100"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
