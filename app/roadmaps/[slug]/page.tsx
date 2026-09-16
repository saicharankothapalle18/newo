'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Map,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Code2,
  Sparkles,
  ChevronRight,
  X,
  Check,
  RotateCcw,
  Play,
  Award,
} from 'lucide-react';
import { CAREER_ROLES, FULLSTACK_ROADMAP, RESOURCES } from '@/lib/data';
import { RoadmapNode, NodeStatus } from '@/lib/types';
import { useBeginnerMode } from '@/components/BeginnerModeToggle';

export default function InteractiveRoadmapPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const career = CAREER_ROLES.find((c) => c.slug === slug) || CAREER_ROLES[0];
  const { isBeginnerMode } = useBeginnerMode();

  const [nodes, setNodes] = useState<RoadmapNode[]>(FULLSTACK_ROADMAP);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [completedTopicIds, setCompletedTopicIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load persisted progress
    const storedProgress = localStorage.getItem(`cp_progress_${slug}`);
    if (storedProgress) {
      try {
        const parsed = JSON.parse(storedProgress);
        setNodes((prev) =>
          prev.map((n) => (parsed[n.id] ? { ...n, status: parsed[n.id] } : n))
        );
      } catch (e) {}
    }

    const storedTopics = localStorage.getItem(`cp_topics_${slug}`);
    if (storedTopics) {
      try {
        setCompletedTopicIds(JSON.parse(storedTopics));
      } catch (e) {}
    }
  }, [slug]);

  const updateNodeStatus = (nodeId: string, status: NodeStatus) => {
    const updated = nodes.map((n) => (n.id === nodeId ? { ...n, status } : n));
    setNodes(updated);

    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode({ ...selectedNode, status });
    }

    // Persist
    const progressMap: Record<string, NodeStatus> = {};
    updated.forEach((n) => {
      if (n.status) progressMap[n.id] = n.status;
    });
    localStorage.setItem(`cp_progress_${slug}`, JSON.stringify(progressMap));

    // Confetti celebration on completion
    if (status === 'completed') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Also trigger save to InsForge database if logged in
    const userId = localStorage.getItem('cp_user_id') || 'guest_user';
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        careerSlug: slug,
        nodeId,
        status,
      }),
    }).catch(() => {});
  };

  const toggleTopicCheck = (topicKey: string) => {
    const next = { ...completedTopicIds, [topicKey]: !completedTopicIds[topicKey] };
    setCompletedTopicIds(next);
    localStorage.setItem(`cp_topics_${slug}`, JSON.stringify(next));
  };

  const completedCount = nodes.filter((n) => n.status === 'completed').length;
  const progressPercent = Math.round((completedCount / nodes.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <span>Official Step-by-Step Curriculum</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              {career.title} Roadmap
            </h1>
          </div>

          {career.roadmapShUrl && (
            <a
              href={career.roadmapShUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors shrink-0"
            >
              <span>View official roadmap on roadmap.sh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Progress Bar Header */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span>Overall Roadmap Progress</span>
            <span className="text-brand-600 dark:text-brand-400 font-bold">
              {completedCount} of {nodes.length} Milestones Completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Roadmap Visual Tree & Drawer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Roadmap Flow (8 columns or 12 if no drawer open) */}
        <div className={`${selectedNode ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6 transition-all`}>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <span>Click any milestone node to open study guide & actions</span>
          </div>

          {/* START Indicator */}
          <div className="flex items-center justify-center">
            <div className="px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-soft tracking-wider flex items-center gap-2">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START HERE</span>
            </div>
          </div>

          {/* Node Chain */}
          <div className="relative space-y-4 max-w-2xl mx-auto">
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              const isCompleted = node.status === 'completed';
              const isLearning = node.status === 'learning';

              return (
                <div key={node.id} className="relative">
                  {/* Connector Line to Next Node */}
                  {index < nodes.length - 1 && (
                    <div className="absolute left-1/2 bottom-[-16px] -translate-x-1/2 w-0.5 h-4 bg-gray-300 dark:bg-gray-700 z-0" />
                  )}

                  {/* Node Button Card */}
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full p-5 rounded-2xl text-left border transition-all duration-200 relative z-10 flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'ring-2 ring-brand-500 border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-soft-lg'
                        : isCompleted
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                        : isLearning
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-800/60'
                        : 'bg-white dark:bg-[#0c121e] border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:shadow-soft'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Step Badge */}
                      <div
                        className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 shadow-xs ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isLearning
                            ? 'bg-brand-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : node.order}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {node.title}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                          {isBeginnerMode ? node.beginnerSummary : node.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                            : isLearning
                            ? 'bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {node.status?.replace('_', ' ') || 'not started'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Goal Reached Milestone */}
          <div className="flex items-center justify-center pt-2">
            <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-soft tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300" />
              <span>JOB READY & PLACEMENT PREPARED</span>
            </div>
          </div>
        </div>

        {/* Selected Node Detail Drawer Panel (5 columns) */}
        {selectedNode && (
          <div className="lg:col-span-5 sticky top-24 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-7 space-y-6 animate-in slide-in-from-right-4 duration-200 max-h-[85vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Milestone #{selectedNode.order}
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                  {selectedNode.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Switcher Actions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                My Learning Status:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['not_started', 'learning', 'completed'] as NodeStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateNodeStatus(selectedNode.id, status)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      selectedNode.status === status
                        ? status === 'completed'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : status === 'learning'
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation with Beginner Mode */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  {isBeginnerMode ? '🌱 Beginner-Friendly Explanation' : '⚙️ Technical Explanation'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {isBeginnerMode ? selectedNode.beginnerSummary : selectedNode.summary}
              </p>

              {selectedNode.whyNeedIt && (
                <div className="pt-2 border-t border-gray-200/60 dark:border-gray-800">
                  <div className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1">
                    Why You Need This:
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedNode.whyNeedIt}
                  </p>
                </div>
              )}
            </div>

            {/* Topics Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Topics to Master ({selectedNode.topics.length}):
              </h4>
              <div className="space-y-1.5">
                {selectedNode.topics.map((t, i) => {
                  const topicKey = `${selectedNode.id}_t_${i}`;
                  const isChecked = !!completedTopicIds[topicKey];
                  return (
                    <label
                      key={i}
                      onClick={() => toggleTopicCheck(topicKey)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer text-xs text-gray-800 dark:text-gray-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300"
                      />
                      <span className={isChecked ? 'line-through text-gray-400' : ''}>{t}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Practice Tasks */}
            {selectedNode.practiceTasks?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Hands-On Practice Exercises:
                </h4>
                <ul className="space-y-2">
                  {selectedNode.practiceTasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
                    >
                      <Code2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Starter Project Idea */}
            {selectedNode.projectIdea && (
              <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 space-y-1.5">
                <div className="text-xs font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Recommended Mini-Project:</span>
                </div>
                <p className="text-xs text-brand-900 dark:text-brand-200 leading-relaxed">
                  {selectedNode.projectIdea}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
