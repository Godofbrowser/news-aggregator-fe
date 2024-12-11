"use client";

import { useState } from 'react';
import { NewsArticle } from '@/lib/types/news';
import { NewsCard } from './NewsCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { HTMLContent } from '../ui/HTMLContent';
import { DialogDescription } from '@radix-ui/react-dialog';

interface NewsGridProps {
  articles: NewsArticle[];
}

export function NewsGrid({ articles }: NewsGridProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </div>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="md:max-w-2xl max-w-[calc(100vw_-_1rem)] w-[calc(100vw_-_1rem)] h-[100vh-3rem] max-h-[calc(100vh_-_3rem)] pt-8 overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader className='sr-only'>
                <DialogTitle>Article detail</DialogTitle>
                <DialogDescription>{selectedArticle.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative w-full h-64">
                  <img
                    src={selectedArticle.thumbnail}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{selectedArticle.source}</span>
                  <span>{format(new Date(selectedArticle.publishedAt), 'MMM dd, yyyy')}</span>
                </div>
                <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                <div className="text-muted-foreground w-full overflow-hidden">
                  <HTMLContent content={selectedArticle.content} />
                </div>
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-12 hover:underline"
                >
                  <ExternalLink className='inline-block'/> Read full article
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}