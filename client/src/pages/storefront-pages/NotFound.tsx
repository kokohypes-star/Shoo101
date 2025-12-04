import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center space-y-6">
      <Card className="p-12 space-y-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => window.location.href = '/storefront'} className="w-full">
          Go Home
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/storefront/products'}
          className="w-full"
        >
          Continue Shopping
        </Button>
      </Card>
    </div>
  );
}
