using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace reactjsnet
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new BabelBundle("~/bundles/CardList").Include(
                            "~/Scripts/Components/CardList/card.jsx",
                            "~/Scripts/Components/CardList/cardList.jsx"
                        ));

            bundles.Add(new BabelBundle("~/bundles/Home").Include(
                "~/Scripts/Views/Home/Index.jsx"
            ));

            BundleTable.EnableOptimizations = true;
        }
    }
}