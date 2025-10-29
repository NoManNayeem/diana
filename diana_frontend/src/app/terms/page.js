"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Welcome to Diana. By using our application, you agree to the following terms.</p>
              <p>Use the service responsibly and comply with applicable laws. Do not misuse, abuse, or attempt to disrupt service availability.</p>
              <p>We may update these terms periodically. Continued use constitutes acceptance of the updated terms.</p>
              <p>If you have questions about these terms, please contact us via the Contact page.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
