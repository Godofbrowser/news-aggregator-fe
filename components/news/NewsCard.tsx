import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NewsArticle } from '@/lib/types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>{article.source}</span>
          <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
      </CardContent>
    </Card>
  );
}